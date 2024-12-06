var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArquivoPDF = /** @class */ (function () {
    function ArquivoPDF() {
    }
    ArquivoPDF.prototype.abrir = function () {
        console.log("Abrindo arquivo PDF...");
    };
    ArquivoPDF.prototype.salvar = function () {
        console.log("Salvando arquivo PDF...");
    };
    return ArquivoPDF;
}());
var ArquivoDOCX = /** @class */ (function () {
    function ArquivoDOCX() {
    }
    ArquivoDOCX.prototype.abrir = function () {
        console.log("Abrindo arquivo DOCX...");
    };
    ArquivoDOCX.prototype.salvar = function () {
        console.log("Salvando arquivo DOCX...");
    };
    return ArquivoDOCX;
}());
var ArquivoXLSX = /** @class */ (function () {
    function ArquivoXLSX() {
    }
    ArquivoXLSX.prototype.abrir = function () {
        console.log("Abrindo arquivo XLSX...");
    };
    ArquivoXLSX.prototype.salvar = function () {
        console.log("Salvando arquivo XLSX...");
    };
    return ArquivoXLSX;
}());
var ArquivoTXT = /** @class */ (function () {
    function ArquivoTXT() {
    }
    ArquivoTXT.prototype.abrir = function () {
        console.log("Abrindo arquivo TXT...");
    };
    ArquivoTXT.prototype.salvar = function () {
        console.log("Salvando arquivo TXT...");
    };
    return ArquivoTXT;
}());
var EditorArquivo = /** @class */ (function () {
    function EditorArquivo() {
    }
    EditorArquivo.prototype.gerenciarArquivo = function () {
        var arquivo = this.criarArquivo();
        arquivo.abrir();
        arquivo.salvar();
    };
    return EditorArquivo;
}());
var EditorPDF = /** @class */ (function (_super) {
    __extends(EditorPDF, _super);
    function EditorPDF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorPDF.prototype.criarArquivo = function () {
        return new ArquivoPDF();
    };
    return EditorPDF;
}(EditorArquivo));
var EditorDOCX = /** @class */ (function (_super) {
    __extends(EditorDOCX, _super);
    function EditorDOCX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorDOCX.prototype.criarArquivo = function () {
        return new ArquivoDOCX();
    };
    return EditorDOCX;
}(EditorArquivo));
var EditorXLSX = /** @class */ (function (_super) {
    __extends(EditorXLSX, _super);
    function EditorXLSX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorXLSX.prototype.criarArquivo = function () {
        return new ArquivoXLSX();
    };
    return EditorXLSX;
}(EditorArquivo));
var EditorTXT = /** @class */ (function (_super) {
    __extends(EditorTXT, _super);
    function EditorTXT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorTXT.prototype.criarArquivo = function () {
        return new ArquivoTXT();
    };
    return EditorTXT;
}(EditorArquivo));
