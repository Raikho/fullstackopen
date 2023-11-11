describe('Blog app', () => {
	const user = {
		name: 'Mateen',
		username: 'test_user',
		password: 'test_pass',
	}

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:5173')
	})

	it('front page can be opened', function() {
		cy.contains('log in to application')
	})

	it('user can login', function() {
		cy.get('#username').type(user.username)
		cy.get('#password').type(user.password)
		cy.get('#login-button').click()

		cy.contains(`${user.name} logged in`)
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
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