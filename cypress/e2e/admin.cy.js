describe('Teste de Login', () => {
    // Função para realizar o login no site
    function loginNoSite() {
        cy.visit('/auth/entrar')
    
        cy.get('div[class="auth-header"] h1')
          .should('have.text', 'Entrar')
    
        // Preenchendo o campo de e-mail
        cy.get('input[type="email"]')
          .type(Cypress.env('lelexdapg@gmail.com'), { delay: 100 });
    
        // Preenchendo o campo de senha
        cy.get('input[type="password"]')
          .type(Cypress.env('Iterasy2024'), { delay: 100 });
    
        cy.resolveCaptcha() //função para resolver o captcha
    
        // Clicando no botão de submit
        cy.get('button[type="submit"]')
          .click()
    }
  
    // Função para realizar o login com cookies
    function loginComCookie() {
        cy.setCookie('i18n_redirected', 'pt')
        cy.setCookie('ev_at_62bf145fd8ff1ef247cd4eda', '50631d00-930f-11ef-a3b4-1595982be9f6e56ad635-cf11-4ebb-a12c-8ef712aaf63b')
    }
  
    beforeEach(() => {
        loginComCookie() // Define os cookies primeiro
        cy.visit('https://testando.eveclass.com/pt/admin/conteudo/cursos') // Depois visita a URL
        cy.wait(1000)
        // loginNoSite(); // Descomente se quiser usar a função de login normal
    });
  
    it('Verifica se o login foi bem-sucedido', () => {
        // Adicione suas asserções aqui para verificar se o login foi bem-sucedido
        cy.url().should('include', '/admin') // Exemplo: verificar se a URL contém '/meus-cursos'
    })

    it('Criar novo Curso', () => {
        
        cy.contains('span', 'Novo Curso')
            .click()

        cy.contains('.card-radio-option button', 'Selecionar')
            .click();

        cy.get('i.icon-right.fas.fa-arrow-right')
            .click()

        cy.get('i.far.fa-user-clock')
            .click()

        cy.contains('button', 'Prosseguir')
            .click()

        cy.get('input[name^="nome-i-"]')
            .type('Teste 141')
        
        cy.get('textarea[placeholder="Resumo explanatório do curso"]')
            .type('Teste 141-')
                    
        // Selecionar Autor
        // Abre o combobox para exibir as opções
        cy.get('#vs1__combobox').click({ force: true })
        // Aguarda a lista de opções e busca 
        cy.get('.vs__dropdown-menu').should('be.visible'); // Garante que a lista de opções está visível

        cy.get('#vs1__option-0 > div').click({ force: true }) // Tenta clicar na opção diretamente

        cy.get('.ProseMirror') // Seleciona o elemento com a classe .ProseMirror
            .should('have.attr', 'contenteditable', 'true') // Verifica se o elemento é editável
            .invoke('html', '<p>teste curso 141</p>') // Altera o conteúdo do elemento

        //Tags??

        // Verifica se o texto contém "Vídeo de apresentação"
        cy.get('label:contains("Vídeo de apresentação")')
            .should('contain.text', 'Vídeo de apresentação')

        // Insere o link do YouTube no campo específico
        cy.get('input[placeholder="https://www.youtube.com/watch?v=code"]')
            .type('https://www.youtube.com/watch?v=65tNdOF6Ulk', { force: true })

        // Anexar imagem??
        
        cy.get('input[data-vv-as="Nome do instrutor no certificado"]')
            .type('Instrutor Teste')

        cy.contains('span.button-text', 'Salvar')
            .click()

    })
})
