interface Arquivo {
    abrir(): void;
    salvar(): void;
  }

  class ArquivoPDF implements Arquivo {
    abrir(): void {
      console.log("Abrindo arquivo PDF...");
    }
    salvar(): void {
      console.log("Salvando arquivo PDF...");
    }
  }
  
  class ArquivoDOCX implements Arquivo {
    abrir(): void {
      console.log("Abrindo arquivo DOCX...");
    }
    salvar(): void {
      console.log("Salvando arquivo DOCX...");
    }
  }
  
  class ArquivoXLSX implements Arquivo {
    abrir(): void {
      console.log("Abrindo arquivo XLSX...");
    }
    salvar(): void {
      console.log("Salvando arquivo XLSX...");
    }
  }
  
  class ArquivoTXT implements Arquivo {
    abrir(): void {
      console.log("Abrindo arquivo TXT...");
    }
    salvar(): void {
      console.log("Salvando arquivo TXT...");
    }
  }
  abstract class EditorArquivo {
    abstract criarArquivo(): Arquivo;
  
    gerenciarArquivo(): void {
      const arquivo = this.criarArquivo();
      arquivo.abrir();
      arquivo.salvar();
    }
  }
  class EditorPDF extends EditorArquivo {
    criarArquivo(): Arquivo {
      return new ArquivoPDF();
    }
  }
  
  class EditorDOCX extends EditorArquivo {
    criarArquivo(): Arquivo {
      return new ArquivoDOCX();
    }
  }
  
  class EditorXLSX extends EditorArquivo {
    criarArquivo(): Arquivo {
      return new ArquivoXLSX();
    }
  }
  
  class EditorTXT extends EditorArquivo {
    criarArquivo(): Arquivo {
      return new ArquivoTXT();
    }
  }
    