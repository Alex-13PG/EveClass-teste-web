describe('Teste de Login', () => {
    // Função para realizar o login no site
    function loginNoSite() {
        cy.visit('/auth/entrar')
    
        cy.get('div[class="auth-header"] h1')
          .should('have.text', 'Entrar')
    
        cy.get('input[type="email"]')
          .type(Cypress.env('alex.s931027@gmail.com'), { delay: 100 });
    
        cy.get('input[type="password"]')
          .type(Cypress.env('Iterasy2024'), { delay: 100 });
    
        cy.resolveCaptcha() // Presumindo que você tem uma função para resolver o captcha
    
        // Clicando no botão de submit
        cy.get('button[type="submit"]')
          .click()
    }

    // Função para realizar o login com cookies
    function loginComCookie() {
        cy.setCookie('ev_dv_62bf145fd8ff1ef247cd4eda', '671ed14479c36c6554cbcb06')
        cy.setCookie('ev_at_62bf145fd8ff1ef247cd4eda', 'f1eebee0-94bd-11ef-8c2a-e1b8a98d026238e909ab-d653-4ea4-a57e-81e5270f34aa')
    }

    beforeEach(() => {
        loginComCookie() // Define os cookies primeiro
        cy.visit('https://testando.eveclass.com/pt/conta/meus-cursos') // Depois visita a URL
        cy.wait(1000)
        // loginNoSite(); // Descomente se quiser usar a função de login normal
    });

    it('Verifica se o login foi bem-sucedido', () => {
        // Adicione suas asserções aqui para verificar se o login foi bem-sucedido
        cy.url().should('include', '/meus-cursos') // Exemplo: verificar se a URL contém '/meus-cursos'
    })

    it('Comprar Curso', () => {

      cy.title('Minha Conta / Meus Cursos - Teste')

      cy.wait(2000)
      
      cy.contains('a', 'Procurar cursos')
          .click()

      cy.wait(2000)
      
      cy.title('eq', 'Cursos - Teste')

      cy.wait(2000)
      
      cy.get('input[type="text"]')
          .type('java em poucos passos')

      cy.wait(2000)
      
      cy.contains('Java em poucos passos')
          .click();

      cy.wait(2000)
      
      cy.title('eq', 'Java em poucos passos - Teste')

      cy.wait(2000)

      cy.contains('span', 'Comprar')
        .click()

      cy.wait(2000)
      
      cy.title('eq', 'Comprar: Java em poucos passos - Teste')

      cy.wait(2000)

      cy.contains('span', 'Confirmar Compra')
        .click()

      cy.wait(2000)

      cy.pause()

      cy.contains('span', 'Confirmar Compra')
        .click()
      
      cy.title('eq', 'Compra realizada!')

      cy.contains('Iniciar Curso')
        .click()

    })
})