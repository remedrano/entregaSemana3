describe('Los estudiantes buscar profesor', function() {
    it('Visitar a los estudiantes y buscar profesor', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      

cy.get('.Select-control').click().focused().type('Dario Correal', { force:true});


    })
})
