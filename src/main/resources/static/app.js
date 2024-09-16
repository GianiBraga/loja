// Carregar produtos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);

function carregarProdutos() {
    fetch("http://localhost:8080/api/produtos")
        .then(response => response.json())
        .then(produtos => {
            const tbody = document.getElementById("produtosTableBody");
            tbody.innerHTML = ""; // Limpa a tabela antes de inserir novos dados
            produtos.forEach(produto => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>${produto.categoria}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmarRemocao(${produto.id})">Remover</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

// Adicionar ou atualizar produto
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const produto = {
        nome: document.getElementById("produtoNome").value,
        preco: document.getElementById("produtoPreco").value,
        categoria: document.getElementById("produtoCategoria").value
    };

    const produtoId = document.getElementById("produtoId").value;

    if (produtoId) {
        // Atualizar produto
        fetch(`http://localhost:8080/api/produtos/${produtoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            alert("Produto atualizado com sucesso!");
            carregarProdutos();
            document.getElementById("produtoForm").reset(); // Limpa o formulário
            document.getElementById("produtoId").value = ''; // Limpa o ID oculto
        })
        .catch(error => console.error("Erro ao atualizar produto", error));
    } else {
        // Adicionar produto
        fetch("http://localhost:8080/api/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            alert("Produto cadastrado com sucesso!");
            carregarProdutos();
            document.getElementById("produtoForm").reset(); // Limpa o formulário
        })
        .catch(error => console.error("Erro ao cadastrar produto", error));
    }
});

// Função para editar um produto
function editarProduto(id) {
    fetch(`http://localhost:8080/api/produtos/${id}`)
        .then(response => response.json())
        .then(produto => {
            // Preencher o formulário com os dados do produto
            document.getElementById("produtoId").value = produto.id;
            document.getElementById("produtoNome").value = produto.nome;
            document.getElementById("produtoPreco").value = produto.preco;
            document.getElementById("produtoCategoria").value = produto.categoria;
        })
        .catch(error => console.error("Erro ao carregar produto para edição", error));
}

// Função para confirmar a remoção de um produto
function confirmarRemocao(id) {
    if (confirm("Deseja realmente remover este produto?")) {
        removerProduto(id);
    }
}

// Função para remover um produto
function removerProduto(id) {
    fetch(`http://localhost:8080/api/produtos/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Produto removido com sucesso!");
        carregarProdutos(); // Atualizar a tabela após a remoção
    })
    .catch(error => console.error("Erro ao remover produto", error));
}
