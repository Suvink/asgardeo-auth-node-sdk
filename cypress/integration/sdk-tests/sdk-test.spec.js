/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe("Given the Node SDK", () => {

    context("When I call the home endpoint", () => {
        it("Then it should return a Hello World", () => {
            cy.request({
                method: "GET",
                url: "/",
            }).should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.eq("Hello World");
            });
        });
    });

    context("When I call the login endpoint", () => {
        it("Then it should return the Asgardeo login page", () => {
            cy.visit("/login").should((response) => {
                cy.wait(5000); //wait for 5 seconds to load the login page
                cy.findByTestId('login-page-username-input').should('exist');
                cy.findByTestId('login-page-password-input').should('exist');
                cy.findByTestId('login-page-continue-login-button').should('exist');
            });
        });
    });

    context("When I input the username and password", () => {
        it("Then it should return the Access Token", () => {
            cy.request({
                method: "GET",
                url: "/login",
            }).then(() => {
                cy.wait(5000); //wait for 5 seconds to load the login page
                cy.findByTestId('login-page-username-input').type('asgardeo-node-testbot@asgardeo.io');
                cy.findByTestId('login-page-password-input').type('asgardeo@Nodejs123');
                cy.findByTestId('login-page-continue-login-button').click();
            })
            .then(response => {
                cy.wait(5000);
                // expect(response.status).to.eq(200);
                // expect(response.body).to.have.all.keys('accessToken', 'refreshToken', 'scope', 'tokenType', 'session');
            })
        });
    });

    context("When I call the ID endpoint", () => {
        it("Then it should return the ID Token", () => {
            cy.request({
                method: "GET",
                url: "/id",
            }).should(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('accessToken', 'refreshToken', 'scope', 'tokenType', 'session');
            });
        });
    });

});
