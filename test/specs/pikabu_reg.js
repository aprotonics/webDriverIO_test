describe('Registration Test', () => {
    let URL = 'https://pikabu.ru/'
    
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

    let firstPasswordSuccessSelector = 'div.requirements-hint__rules > div:first-child svg.icon--auth__success'
    let secondPasswordSuccessSelector = 'div.requirements-hint__rules > div:nth-child(2) svg.icon--auth__success'
    let thirdPasswordSuccessSelector = 'div.requirements-hint__rules > div:last-child svg.icon--auth__success'
    let firstPasswordErrorSelector = 'div.requirements-hint__rules > div:first-child svg.icon--auth__error'
    let secondPasswordErrorSelector = 'div.requirements-hint__rules > div:nth-child(2) svg.icon--auth__error'
    let thirdPasswordErrorSelector = 'div.requirements-hint__rules > div:last-child svg.icon--auth__error'
    let passwordSuccessSelectors = [firstPasswordSuccessSelector, secondPasswordSuccessSelector, thirdPasswordSuccessSelector]
    let passwordErrorSelectors = [firstPasswordErrorSelector, secondPasswordErrorSelector, thirdPasswordErrorSelector]
    
    async function chechPassword(password, firstPassIcon, secondPassIcon, thirdPassIcon) {
        await $(passwordFieldSelector).setValue(password);
        await $(loginFieldSelector).click()
        
        let passIconSelectors = []
        let passIcons = [firstPassIcon, secondPassIcon, thirdPassIcon]
        passIcons.forEach((passIcon, index) => {
            let passwordIconSelector
            if (passIcon === 'success') {
                passwordIconSelector = passwordSuccessSelectors[index]
                
            } else if (passIcon === 'error') {
                passwordIconSelector = passwordErrorSelectors[index]
            }
            passIconSelectors.push(passwordIconSelector)
        })

        for (let i = 0; i < passIconSelectors.length; i++) {
            await expect($(passIconSelectors[i])).toBeExisting()
            await expect($(passIconSelectors[i]))
            .toHaveElementClassContaining(`icon--auth__${passIcons[i]}`);
        }
    }

    it('positive reg', async () => {
        await browser.url(URL);

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
        await browser.url(URL);

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
        await browser.url(URL);

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
        await browser.url(URL);

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
        await browser.url(URL);

        await $(toSignupFormButtonSelector).click();

        chechPassword(first_password, 'error', 'error', 'error')
        chechPassword(second_password, 'error', 'success', 'error') 
        chechPassword(third_password, 'error', 'error', 'success') 
        chechPassword(fourth_password, 'success', 'error', 'success') 
        chechPassword(fifth_password, 'success', 'success', 'success')  
    });
});
