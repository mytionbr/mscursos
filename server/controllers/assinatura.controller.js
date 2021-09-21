import moment from 'moment'
import pool from '../database/pool.js'

export const create = async (req,res) =>{
    try{
    
        const price = req.body.price
        const planoId = req.body.planoId
        const alunoId = req.body.alunoId
        let pagamento  
        
        if(req.body.paymentResult){
           
            const {id, status, update_time, payer:{ email_address}} = req.body.paymentResult
                       
            pagamento = {
                pagamento_id: id,
                status: status,
                update_time: update_time,
                email: email_address
            }
        }

        let assinatura ={
            preco: price,
            plano_id: planoId,
            aluno_id: alunoId,
            data_criacao: moment().format('YYYY-MM-DD'),
            pago: false,
            pagamento_id: null
        }

        if(pagamento){
            const pagamentoRows = await pool.query(`
                INSERT INTO PAGAMENTO (payment_response_id,status, update_time, email)
                VALUES($1,$2,$3,$4) RETURNING * ;`,
                [pagamento.pagamento_id, pagamento.status, pagamento.update_time, pagamento.email])
            if(pagamentoRows){
                assinatura.pago = true
                assinatura.pagamento_id = pagamentoRows.rows[0].pagamento_id
            }    
        }

        const { rows } = await pool.query(
            `INSERT INTO ASSINATURA (pago, data_criacao, preco, plano_id, aluno_id, pagamento_id)
            VALUES($1,$2,$3,$4,$5,$6) RETURNING assinatura_id,pago,plano_id,aluno_id ;`,
            [assinatura.pago, assinatura.data_criacao, assinatura.preco, assinatura.plano_id,assinatura.aluno_id, assinatura.pagamento_id]
        )
        
        const assinaturaCreated = rows[0]

        res.status(201).json(assinaturaCreated)
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.error})
    }
}