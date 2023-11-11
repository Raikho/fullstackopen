describe('Blog app', () => {

	beforeEach(function() {
		cy.visit('http://localhost:5173')
	})

	it('front page can be opened', function() {
		cy.contains('log in to application')
	})

	it('user can login', function() {
		cy.get('#username').type('root')
		cy.get('#password').type('secret')
		cy.get('#login-button').click()

		cy.contains('Root User logged in')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.get('#username').type('root')
			cy.get('#password').type('secret')
			cy.get('#login-button').click()
		})

		it('a new node can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title-input').type('A blog created by cypress')
			cy.get('#author-input').type('Cypress Author')
			cy.get('#url-input').type('www.CypressBlog.com')
			cy.get('#create-button').click()
			cy.contains('A blog created by cypress')
		})
	})

})