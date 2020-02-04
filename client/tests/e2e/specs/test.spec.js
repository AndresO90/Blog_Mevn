
describe('Login user and create a new Post', () => {
    it("Upload a Post", ()=> {
        cy.visit('http://localhost:8080/');
        cy.get("#loginBtn").click();
        cy.get("#usernameLoginInput").type("blogUser");
        cy.get("#passwordLoginInput").type("123");
        cy.get("#loginBtnSubmit").click();
        cy.get("#myPosts").click();
        cy.get("#titlePostInput").type("TITULO DESDE CYPRESS");
        cy.get("#textPostTextarea").type("TEXTO DEL POST DESDE CYPRESS")
        cy.get("#uploadPostButton").click();
    });
  })

  describe('Login user and create new comment', () => {
    it("Create comment WITHOUT offensive words", ()=> {
        cy.visit('http://localhost:8080/');
        cy.get("#loginBtn").click();
        cy.get("#usernameLoginInput").type("blogUser");
        cy.get("#passwordLoginInput").type("123");
        cy.get("#loginBtnSubmit").click();
        cy.get("#5e31b67e693ff45ff59af7bc").click();
        cy.get("#textCommentTextarea").type("COMENTARIO DESDE CYPRESS SIN PALABRAS OFENSIVAS");
        cy.get("#btn-comment").click();
    });
  });

describe('Login user and create new comment', () => {
    it("Create comment WITH offensive words", ()=> {
        cy.visit('http://localhost:8080/');
        cy.get("#loginBtn").click();
        cy.get("#usernameLoginInput").type("blogUser");
        cy.get("#passwordLoginInput").type("123");
        cy.get("#loginBtnSubmit").click();
        cy.get("#5e31b67e693ff45ff59af7bc").click();
        cy.get("#textCommentTextarea").type("COMENTARIO DESDE CYPRESS SIN PALABRAS OFENSIVAS CAPULLO");
        cy.get("#btn-comment").click();
    });
  })