package ru.kata.spring.boot_security.demo.repository;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;


@Repository
public class UserRepositoryImpl implements UserRepository {

    private final EntityManager entityManager;


    public UserRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public List<User> findAll() {
        return entityManager.createQuery("SELECT a FROM User a", User.class).getResultList();
    }

    @Override
    public User findUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findByFirstName(String username) {
        TypedQuery<User> query = (entityManager.createQuery("select users from User users " +
                "join fetch users.roles where users.firstName = :username", User.class));
        query.setParameter("username", username);
        return query.getResultList().stream().findFirst().orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        entityManager.remove(findUserById(id));
    }

    @Override
    @Transactional
    public void save(User user) {
        entityManager.persist(user);
    }
}
