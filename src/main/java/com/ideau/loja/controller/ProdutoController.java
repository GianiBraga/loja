package com.ideau.loja.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ideau.loja.model.Produto;
import com.ideau.loja.service.ProdutoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // Adicionar novo produto
    @PostMapping
    public Produto adicionarProduto(@RequestBody Produto produto) {
        return produtoService.salvarProduto(produto);
    }

    // Listar todos os produtos
    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarProdutos();
    }

    // Buscar produto por ID
    @GetMapping("/{id}")
    public Optional<Produto> buscarProdutoPorId(@PathVariable Long id) {
        return produtoService.buscarProdutoPorId(id);
    }

    // Atualizar produto existente
    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto produto) {
        return produtoService.atualizarProduto(id, produto);
    }

    // Remover produto por ID
    @DeleteMapping("/{id}")
    public void removerProduto(@PathVariable Long id) {
        produtoService.removerProduto(id);
    }
}
