describe('Blog app', () => {
	const user1 = {
		name: 'Bob Smith',
		username: 'test_user_1',
		password: 'test_pass_1',
	}
	const user2 = {
		name: 'Jane Doe',
		username: 'test_user_2',
		password: 'test_pass_2',
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
		likes: 2,
	}
	const blog3 = {
		title: 'Third blog created by cypress',
		author: 'Secondary Cypress Author',
		url: 'www.CypressBlog.com',
		likes: 4,
	}

	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user1)
		cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
		cy.visit('')
	})

	it('Login form is shown', function() {
		cy.get('html').should('contain', 'log in to application')
		cy.get('#username').should('exist')
		cy.get('#password').should('exist')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type(user1.username)
			cy.get('#password').type(user1.password)
			cy.get('#login-button').click()

			cy.get('html').should('contain', `${user1.name} logged in`)
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('x')
			cy.get('#password').type('x')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
			cy.get('html').should('not.contain', `${user1.name} logged in`)
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login(user1)
		})

		it('can logout', function() {
			cy.get('#logout-button').click()
			cy.get('html').should('contain', 'log in to application')
		})

		it('a blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title-input').type(blog1.title)
			cy.get('#author-input').type(blog1.author)
			cy.get('#url-input').type(blog1.url)
			cy.get('#create-button').click()

			cy.get('.blog').should('contain', blog1.title)
		})

		describe('and several notes by diff users exist', function() {
			beforeEach(function() {
				cy.createBlog(blog1)
				cy.createBlog(blog2)
				cy.get('#logout-button').click()
				cy.login(user2)
				cy.createBlog(blog3)
				cy.visit('')
			})

			it('one of those can be liked', function() {
				const blogText = blog2.title.concat(' ', blog2.author)
				cy.contains(blogText).as('blog2')

				cy.get('@blog2').find('.show-button').click()
				cy.get('@blog2').find('.likes')
					.should('contain', blog2.likes)
				cy.get('@blog2').find('.like-button').click()
				cy.get('@blog2').find('.likes')
					.should('contain', blog2.likes + 1)
			})

			it('user can delete their own blog', function() {
				cy.contains(blog3.title.concat(' ', blog3.author)).as('blog3')
				cy.get('@blog3').find('.show-button').click()
				cy.get('@blog3').find('.remove-button').click()
				cy.get('@blog3').should('not.exist')
			})

			it('user cant see delete button of unowned blogs', function() {
				cy.contains(blog2.title.concat(' ', blog2.author)).as('blog2')
				cy.get('@blog2').find('.show-button').click()
				cy.get('@blog2').find('.like-button').should('exist')
				cy.get('@blog2').find('.remove-button').should('not.exist')
			})

			it('blogs are listed by most liked', function() {
				cy.get('.blog-container>.blog').should('exist').as('blogs')
				cy.get('@blogs').should('exist')
				cy.get('@blogs').eq(0).should('contain', blog3.title)
				cy.get('@blogs').eq(1).should('contain', blog2.title)
				cy.get('@blogs').eq(2).should('contain', blog1.title)
			})
		})
	})

})