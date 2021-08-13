import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'

function StepperMatricula({step}) {
    
    const steps = [
        'Suas informações',
        'Infomações de pagamento',
        'Acesse a plataforma'
    ]

    return (
        <div>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map(label=>(
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>      
        </div>
    )
}

export default StepperMatricula
