// useFiltragem.js
import { useState, useEffect, useMemo } from 'react';
import competencias from './competencias.json';

const useFiltragem = (categoriaFiltro, relevanciaFiltro, classificacaoFiltro) => {
  const [dadosFiltrados, setDadosFiltrados] = useState(competencias);
  const [carregando, setCarregando] = useState(false);

  const filtrarDados = (dados) => {
    return dados.reduce((acc, item) => {
      let incluiItem = true;

      const categoriaNum = categoriaFiltro ? parseInt(categoriaFiltro) : null;
      const relevanciaNum = relevanciaFiltro !== '' ? parseInt(relevanciaFiltro) : null;

      if (categoriaNum !== null && item.category !== categoriaNum) {
        incluiItem = false;
      }

      if (relevanciaNum !== null && item.relevancia < relevanciaNum) {
        incluiItem = false;
      }

      if (classificacaoFiltro && item.classificação !== classificacaoFiltro) {
        incluiItem = false;
      }

      let novoItem = { ...item };

      if (item.children) {
        novoItem.children = filtrarDados(item.children);
      }

      if (incluiItem || (novoItem.children && novoItem.children.length)) {
        acc.push(novoItem);
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    setCarregando(true);
    const aplicarFiltros = () => {
      const filtrados = filtrarDados(competencias);
      setDadosFiltrados(filtrados);
      setCarregando(false);
    };

    aplicarFiltros();
  }, [categoriaFiltro, relevanciaFiltro, classificacaoFiltro]);

  return { dadosFiltrados, carregando };
};

export default useFiltragem;