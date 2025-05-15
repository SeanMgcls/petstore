package com.magcalas.Artist;

import com.magcalas.Artist.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    // You can add custom query methods here if needed
    // For example:
    // List<Artist> findByArtistContainingIgnoreCase(String name);
}