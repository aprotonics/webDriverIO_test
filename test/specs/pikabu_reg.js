describe('Registration Test', () => {
    let number = Math.floor(Math.random() * (1000000000 - 10000000) + 10000000)
    let correct_email = `test${number}@mail.ru`
    let incorrect_email = `test${number}`
    let correct_login = `test${number}`
    let correct_password = `test${number}`

    let toSignupFormButtonSelector = '#signin-form span[data-to="signup"]'
    let emailFieldSelector = 'form div.auth__field input[type="email"]'
    let loginFieldSelector = '[data-id="signup"] form div.auth__field input[type="text"]'
    let passwordFieldSelector = '[data-id="signup"] form div.auth__field input[type="password"]'
    let submitButtonSelector = 'form button[data-zuko-name="create_account_btn"]'
    let accountConfirmTextSelector = 'div[data-role="account-confirm"] a'
    let PopupHintSelector = 'div.popup__hint'
    let errorSpanSelector = '[data-id="signup"] span.auth__error'

    let firstPasswordCrossSelector = 'div.requirements-hint__rules > div:first-child svg.icon--auth__error'
    let secondPasswordCrossSelector = 'div.requirements-hint__rules > div:nth-child(2) svg.icon--auth__error'
    let thirdPasswordCrossSelector = 'div.requirements-hint__rules > div:last-child svg.icon--auth__error'
    let firstPasswordCheckSelector = 'div.requirements-hint__rules > div:first-child svg.icon--auth__success'
    let secondPasswordCheckSelector = 'div.requirements-hint__rules > div:nth-child(2) svg.icon--auth__success'
    let thirdPasswordCheckSelector = 'div.requirements-hint__rules > div:last-child svg.icon--auth__success'
    
    it('positive reg', async () => {
        await browser.url(`https://pikabu.ru/`);

        await $(toSignupFormButtonSelector).click();
        await $(emailFieldSelector).setValue(correct_email);
        await $(loginFieldSelector).setValue(correct_login);
        await $(passwordFieldSelector).setValue(correct_password);
        await $(submitButtonSelector).click();

        await expect($(accountConfirmTextSelector)).toBeExisting();
        await expect($(accountConfirmTextSelector)).toHaveTextContaining('Подтвердить аккаунт');
    });

    it('neg reg - wrong email', async () => {
        await browser.reloadSession()
        await browser.url(`https://pikabu.ru/`);

        await $(toSignupFormButtonSelector).click();
        await $(emailFieldSelector).setValue(incorrect_email);
        await $(loginFieldSelector).setValue(correct_login + '5');
        await $(passwordFieldSelector).setValue(correct_password);
        await $(submitButtonSelector).click();

        await expect($(PopupHintSelector)).toBeExisting();
        await expect($(PopupHintSelector)).toHaveTextContaining('Неверный email');
    });

    it('neg reg - without login', async () => {
        await browser.reloadSession()
        await browser.url(`https://pikabu.ru/`);

        await $(toSignupFormButtonSelector).click();
        await $(emailFieldSelector).setValue(correct_email);
        await $(passwordFieldSelector).setValue(correct_password);
        await $(loginFieldSelector).clearValue();
        await $(submitButtonSelector).click();

        await expect($(PopupHintSelector)).toBeExisting();
        await expect($(PopupHintSelector)).toHaveTextContaining('Обязательное поле');
    });

    it('neg reg - same email', async () => {
        await browser.reloadSession()
        await browser.url(`https://pikabu.ru/`);

        await $(toSignupFormButtonSelector).click();
        await $(emailFieldSelector).setValue(correct_email);
        await $(loginFieldSelector).setValue(correct_login + '5');
        await $(passwordFieldSelector).setValue(correct_password);
        await $(submitButtonSelector).click();

        await expect($(errorSpanSelector)).toBeExisting();
        await expect($(errorSpanSelector)).toHaveTextContaining('Email используется');
    });

    it('check password', async () => {
        let first_password = ''
        let second_password = 'q'
        let third_password = '1'
        let fourth_password = '123456'
        let fifth_password = '1q2w3e4r5t6y'
        
        await browser.reloadSession()
        await browser.url(`https://pikabu.ru/`);

        await $(toSignupFormButtonSelector).click();

        await $(passwordFieldSelector).setValue(first_password);
        await $(loginFieldSelector).click()

        await expect($(firstPasswordCrossSelector)).toBeExisting();
        await expect($(secondPasswordCrossSelector)).toBeExisting();
        await expect($(thirdPasswordCrossSelector)).toBeExisting();
        await expect($(firstPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(secondPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(thirdPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');

        await $(passwordFieldSelector).clearValue();
        await $(passwordFieldSelector).setValue(second_password);
        await $(loginFieldSelector).click()

        await expect($(firstPasswordCrossSelector)).toBeExisting();
        await expect($(secondPasswordCheckSelector)).toBeExisting();
        await expect($(firstPasswordCrossSelector)).toBeExisting();
        await expect($(firstPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(secondPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');
        await expect($(firstPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');

        await $(passwordFieldSelector).clearValue();
        await $(passwordFieldSelector).setValue(third_password);
        await $(loginFieldSelector).click()

        await expect($(firstPasswordCrossSelector)).toBeExisting();
        await expect($(secondPasswordCrossSelector)).toBeExisting();
        await expect($(thirdPasswordCheckSelector)).toBeExisting();
        await expect($(firstPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(secondPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(thirdPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');

        await $(passwordFieldSelector).clearValue();
        await $(passwordFieldSelector).setValue(fourth_password);
        await $(loginFieldSelector).click()

        await expect($(firstPasswordCheckSelector)).toBeExisting();
        await expect($(secondPasswordCrossSelector)).toBeExisting();
        await expect($(thirdPasswordCheckSelector)).toBeExisting();
        await expect($(firstPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');
        await expect($(secondPasswordCrossSelector))
        .toHaveElementClassContaining('icon--auth__error');
        await expect($(thirdPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');

        await $(passwordFieldSelector).clearValue();
        await $(passwordFieldSelector).setValue(fifth_password);
        await $(loginFieldSelector).click()

        await expect($(firstPasswordCheckSelector)).toBeExisting();
        await expect($(secondPasswordCheckSelector)).toBeExisting();
        await expect($(thirdPasswordCheckSelector)).toBeExisting();
        await expect($(firstPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');
        await expect($(secondPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');
        await expect($(thirdPasswordCheckSelector))
        .toHaveElementClassContaining('icon--auth__success');
    });
});
