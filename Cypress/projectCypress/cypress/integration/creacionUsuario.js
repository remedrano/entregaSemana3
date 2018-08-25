describe('Los estudiantes - Creacion de usuario -', function() {
    it('Visitar la pagina los estudiantes y registrar un nuevo usuario', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()  
      cy.contains('Ingresar').click()
      cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Rafael")
      cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Medrano")
      cy.get('.cajaSignUp').find('input[name="correo"]').click().type("re.medrano@uniandes.edu.co")	
	cy.get('.cajaSignUp').find('select[name="idUniversidad"]').should('have.value', 'universidad-de-los-andes')
	cy.get('.cajaSignUp').find('input[class="jsx-527058112"]').check()
	cy.get('select[name="idPrograma"]').select('16').should('have.value', '16')
      cy.get('.cajaSignUp').find('input[name="password"]').click().type("12345678")	
cy.get('.cajaSignUp').find('input[name="acepta"]').check()

     cy.get('.cajaSignUp').contains('Registrarse').click()

cy.contains('Ocurrió un error activando tu cuenta')
    })
})
