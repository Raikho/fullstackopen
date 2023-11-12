describe('Blog app', () => {
	const user = {
		name: 'Mateen',
		username: 'test_user',
		password: 'test_pass',
	}
	const blog1 = {
		title: 'First blog created by cypress',
		author: 'Cypress Author',
		url: 'www.CypressBlog.com',
		likes: 0,
	}
	const blog2 = {
		title: 'Second blog created by cypress',
		author: 'Cypress Author',
		url: 'www.CypressBlog.com',
		likes: 0,
	}
	const blog3 = {
		title: 'Third blog created by cypress',
		author: 'Secondary Cypress Author',
		url: 'www.CypressBlog.com',
		likes: 0,
	}

	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
		cy.visit('')
	})

	it('Login form is shown', function() {
		cy.get('html').should('contain', 'log in to application')
		cy.get('#username').should('exist')
		cy.get('#password').should('exist')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type(user.username)
			cy.get('#password').type(user.password)
			cy.get('#login-button').click()

			cy.get('html').should('contain', `${user.name} logged in`)
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('x')
			cy.get('#password').type('x')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
			cy.get('html').should('not.contain', `${user.name} logged in`)
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login(user)
		})

		it('a blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title-input').type(blog1.title)
			cy.get('#author-input').type(blog1.author)
			cy.get('#url-input').type(blog1.url)
			cy.get('#create-button').click()

			cy.get('.blog').should('contain', blog1.title)
		})

		describe('and several notes exist', function() {
			beforeEach(function() {
				cy.createBlog(blog1)
				cy.createBlog(blog2)
				cy.createBlog(blog3)
			})

			it.only('one of those can be liked', function() {
				const blogText = blog2.title.concat(' ', blog2.author)
				cy.contains(blogText).as('blog2')

				cy.get('@blog2').find('.show-button').click()
				cy.get('@blog2').find('.likes')
					.should('contain', blog1.likes)
				cy.get('@blog2').find('.like-button').click()
				cy.get('@blog2').find('.likes')
					.should('contain', blog1.likes + 1)
			})
		})
	})

})