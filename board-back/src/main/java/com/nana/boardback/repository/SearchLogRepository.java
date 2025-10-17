package com.nana.boardback.repository;

import com.nana.boardback.entity.SearchLogEntity;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;

@Registered
public interface SearchLogRepository extends JpaRepository<SearchLogEntity,Integer> {

}
