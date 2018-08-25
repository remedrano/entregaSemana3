describe('Los estudiantes pagina principal de profesor', function() {
    it('Visitar a los estudiantes y mostrar el perfil de un profesor', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      

cy.get('.Select-control').click().focused().type('Dario Correal', { force:true});
cy.get('.Select-menu-outer').contains('Dario Correal', {timeout:5000}).click(); 

    })
})
