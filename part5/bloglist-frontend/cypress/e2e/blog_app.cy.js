describe('Blog app', () => {
	const user = {
		name: 'Mateen',
		username: 'test_user',
		password: 'test_pass',
	}
	const blog = {
		title: 'A blog created by cypress',
		author: 'Cypress Author',
		url: 'www.CypressBlog.com',
	}

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:5173')
	})

	it('front page can be opened', function() {
		cy.contains('log in to application')
	})

	it.only('login fails with wrong credentials', function() {
		cy.get('#username').type('x')
		cy.get('#password').type('x')
		cy.get('#login-button').click()

		cy.get('.error')
			.should('contain', 'wrong username or password')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')
		cy.get('html').should('not.contain', `${user.name} logged in`)
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

		it('a new blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title-input').type(blog.title)
			cy.get('#author-input').type(blog.author)
			cy.get('#url-input').type(blog.url)
			cy.get('#create-button').click()
			cy.contains('A blog created by cypress')
		})

		describe('The new blog', function() {
			beforeEach(function() {
				cy.contains('create new blog').click()
				cy.get('#title-input').type(blog.title)
				cy.get('#author-input').type(blog.author)
				cy.get('#url-input').type(blog.url)
				cy.get('#create-button').click()
			})

			it('can be liked', function() {
				const blogText = blog.title.concat(' ', blog.author)
				cy.contains(blogText).find('.show-button').click()
				cy.contains(blogText).find('.likes').contains('0')
				cy.contains(blogText).find('.like-button').click()
				cy.contains(blogText).find('.likes').contains('1')
			})
		})
	})

})