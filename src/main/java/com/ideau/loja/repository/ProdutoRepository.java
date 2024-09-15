package com.ideau.loja.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideau.loja.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}