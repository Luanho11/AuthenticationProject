package org.hostos.authentication.DAO;

import java.util.Optional;

import org.hostos.authentication.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByUsername(String username); 
    Optional<User> findByEmail(String email);
}
