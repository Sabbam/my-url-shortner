package com.slink.backend.repository;

import com.slink.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByRzpSubscriptionId(String rzpSubscriptionId);

    boolean existsByRegistrationIp(String registrationIp);
}
