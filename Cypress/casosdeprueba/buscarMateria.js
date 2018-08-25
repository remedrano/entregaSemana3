describe('Los estudiantes buscar materia pagina profesor', function() {
    it('Visitar a los estudiantes y buscar materia pagina profesor', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      

cy.get('.Select-control').click().focused().type('Dario Correal', { force:true});
cy.get('.Select-menu-outer').contains('Dario Correal', {timeout:10000}).click(); 


cy.get('.materias').find('input[name="id:ISIS1206"]').check();
cy.get('.materias').find('input[name="id:ISIS1206L"]').check();

//cy.get('.materias').find('[type="checkbox"]').check( ['false'] );



    })
})
