const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

//TODO: NOTE IMPORTANCE CHANGE REVISITED

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'John Test',
        username: 'johnt',
        password: '1234',
      },
    })
  })
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')

    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2023'
      )
    ).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'johnt', '1234')
    await expect(page.getByText('John Test logged-in')).toBeVisible
  })

  test('login fails with wrong passsword', async ({ page }) => {
    await loginWith(page, 'johnt', '12345')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('John Test logged-in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'johnt', '1234')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    // describe('and a note exists', () => {
    //   beforeEach(async ({ page }) => {
    //     await createNote(page, 'another note by playwright')
    //   })

    //   test('importance can be changed', async ({ page }) => {
    //     await page.getByRole('button', { name: 'make not important' }).click()
    //     await expect(page.getByText('make important')).toBeVisible()
    //   })
    // })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const otherNoteElement = await page.getByText('first note')

        await otherNoteElement
          .getByRole('button', { name: 'make not important' })
          .click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})
