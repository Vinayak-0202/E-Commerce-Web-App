package com.Ecom.ecommerce.config;

import com.Ecom.ecommerce.entity.Product;
import com.Ecom.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;            // <<-- correct import (jakarta)
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private final EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

        // Disable methods for Product
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // Disable methods for ProductCategory
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // expose ids for all entities
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // get list of all entity types from JPA metamodel
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create a list to hold entity classes
        List<Class<?>> entityClasses = new ArrayList<>();

        // add each entity's java type to the list
        for (EntityType<?> entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

        // convert to array and expose ids
        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
