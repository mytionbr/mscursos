import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  Button,
  Chip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import {
  Code,
  DeveloperMode,
  FilterBAndW,
  PieChart,
  Translate,
  AllInclusive,
} from "@material-ui/icons/";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { listCategoria } from "../../actions/categoriaActions";
import { findCursos } from "../../actions/cursoActions";
import MessageBox from "../core/MessageBox/MessageBox";
import LoadingBox from "../core/LoadingBox/LoadingBox";

function CategoriaSelector() {

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const { loading, error, categorias } = categoriaList;

  const [checked, setChecked] = useState(null);

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  const handleAction = (categoria_id) => {
    if (checked === categoria_id) {
      dispatch(
        findCursos({
          nome: "",
          categorias: [],
        })
      );
      setChecked(null);
    } else {
      setChecked(categoria_id);
      dispatch(
        findCursos({
          categorias: Array({ categoria_id: categoria_id }),
        })
      );
    }
  };

  const handleClean = () => {
    dispatch(
      findCursos({
        nome: "",
        categorias: [],
      })
    );
    setChecked(null);
  };

  const getIcon = (categoria_id) => {
    let Icon;

    switch (categoria_id) {
      case 1:
        Icon = (props) => <Code {...props} />;
        break;
      case 2:
        Icon = (props) => <DeveloperMode {...props} />;
        break;
      case 3:
        Icon = (props) => <FilterBAndW {...props} />;
        break;
      case 4:
        Icon = (props) => <PieChart {...props} />;
        break;
      case 5:
        Icon = (props) => <Translate {...props} />;
        break;
      case 6:
        Icon = (props) => <AllInclusive {...props} />;
        break;
      default:
        Icon = (props) => <Code {...props} />;
        break;
    }

    return <Icon style={{ color: "#506198" }} />;
  };

  const CategoriaItem = ({ categoria_id, nome }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
      if (checked === categoria_id) {
        setActive(true);
      }
    }, [categoria_id]);

    return (
      <ListItem
        disableGutters
        style={{
          display: "flex",
          py: 0,
        }}
        key={nome}
      >
        <Button
          style={{
            color: "text.secondary",
            fontWeight: "medium",
            justifyContent: "flex-start",
            letterSpacing: 0,
            textTransform: "none",
            width: "100%",
          }}
          onClick={() => handleAction(categoria_id)}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {getIcon(categoria_id)}
            <Box style={{ width: "1rem" }} />
            <Typography variant="body1">{nome}</Typography>
            <Box style={{ flexGrow: 1 }} />
            {active ? <CheckBoxIcon style={{color: "#506198"}} /> : ""}
          </Box>
        </Button>
      </ListItem>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">{error}</MessageBox>
      ) : (
        <Paper>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              style={{
                alignItems: "center",
                display: "flex",
                padding: "1.5rem 2rem",
              }}
            >
              <Typography color="textPrimary" variant="h5">
                Categorias{" "}
                {checked ? <Chip label="Limpar" onClick={handleClean} /> : ""}
              </Typography>
            </Box>
            <Divider />
            <Box style={{ padding: "1rem" }}>
              <List>
                {categorias.map((item) => (
                  <CategoriaItem
                    categoria_id={item.categoria_id}
                    nome={item.nome}
                  />
                ))}
              </List>
            </Box>
            <Box style={{ flexGrow: 1 }} />
          </Box>
        </Paper>
      )}
    </>
  );
}

export default CategoriaSelector;
