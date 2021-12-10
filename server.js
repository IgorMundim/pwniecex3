
var express = require('express');

// Inicializa um objeto de aplicação Express
var app = express();
app.use(express.json());

const lista_produtos = {
    produtos: [
        { id: 0, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 1, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 2, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 3, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 4, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
}
function idExiste(novoCodigo) {
    let produtos = lista_produtos.produtos;
    if (produtos)
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id == novoCodigo)
                return true;
        }
    return false;
}
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method + '-' + req.url);
    next();
});

app.get('/', function (req, res) {
    res.send('API de Produtos');
});

app.get('/produtos', function (req, res) {
    res.json(lista_produtos);
});

app.get('/produtos/:id', function (req, res) {
    const { id } = req.params;
    let index;
    let produtos = lista_produtos.produtos;
    for (i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id) {
            index = i;
            return res.json(produtos[index]);
        }
    }
    res.send("Id existente, tente outro ou consulte lista no GET!");
});

app.post("/produtos", function (req, res) {
    const produto = { ...req.body };
    let produtos;
    if (!idExiste(produto.id)) {
        lista_produtos.produtos.push(produto);
        produtos = lista_produtos.produtos;
        produtos.sort(function (a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });
        return res.json(lista_produtos);
    }
    res.send("Id existente, tente outro ou consulte lista no GET!");
    
})

app.put("/produtos/:id", function (req, res) {
    const { id } = req.params;
    const produto = { ...req.body };

    let produtos = lista_produtos.produtos;

    for (i = 0; i < produtos.length; i++) {

        if (produtos[i].id == id) {
            produtos[i].descricao = produto.descricao;
            produtos[i].valor = produto.valor;
            produtos[i].marca = produto.marca;
            return res.json(lista_produtos);
        }
    }
    return res.send("Id existente, tente outro ou consulte lista no GET!");
})

app.delete("/produtos/:id", function (req, res) {
    const { id } = req.params;
    let produtos = lista_produtos.produtos;

    for (i = 0; i < produtos.length; i++) {
        if (produtos[i].id == id) {
            produtos.splice(i, 1);
            return res.json(lista_produtos);
        }
    }
    res.send("Id existente, tente outro ou consulte lista no GET!");
})



// Inicializa o servidor HTTP na porta 3000
let porta = process.env.PORT || 3000;
app.listen(porta, function () {
    console.log(`Servidor rodando: http://localhost:${porta}`);
});