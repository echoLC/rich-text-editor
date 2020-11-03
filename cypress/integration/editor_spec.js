describe('Editor init', () => {
  beforeEach(() => {
    // per test suit reload page
    cy.reload()
  })

  it('it should can init basic editor by new Editor instance pass dom', () => {
    // 访问首页
    cy.visit('/')

    cy.get('#editor')
      .as('Editor') // 给editor元素加个别名，方便后面调用
      .should('be.visible') // 断言元素可见
      .and('have.class', 'editor-container') // 断言是否包括editor-container类名

    // 使用前面的别名获取编辑器，并断言editor-toolbar是其第一个子元素
    cy.get('@Editor').find('.editor-toolbar').first()

    // 查找到toolbar元素，并且断言其有3个子元素
    cy.get('.editor-toolbar').children().should('have.length', 3)

    // 使用前面的别名获取编辑器，并断言editor-toolbar是其最后一个子元素
    cy.get('@Editor').find('.editor-content').last()

    // 断言 editor-content 元素包含 test 文本
    cy.get('.editor-content').should('contain', 'test')
  })

  it('it should click h button make text change to h1 title', () => {
    // 找到editor-content，并且使其获得焦点
    cy.get('.editor-content').as('Content').focus()
    // 获得焦点后，点击H按钮
    cy.get('.editor-toolbar').children().first().click()
    // 断言编辑器里面的内容添加标题h1，并且内容是 test
    cy.get('@Content').get('h1').contains('test')
  })

  it('it should click b button make text change to bold style', () => {
    // 找到editor-content，并且使其获得焦点，点击后
    cy.get('.editor-content').as('Content').focus().click()

    // 执行选中内容命令
    cy.get('@Content').type('{selectall}')

    // 点击toolbar bold按钮
    cy.get('.editor-toolbar').children().eq(1).click()

    // 断言编辑器里面的内容添加 b标签而变成加粗样式，并且内容是 test
    cy.get('@Content').get('b').contains('test')
  })
})
