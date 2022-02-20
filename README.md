# webDriverIO

### Инструкции для запуска тестов
```
В терминале перейти в директорию, содержащую файл теста
```

```
Ввести следующие команды:
```

```
npm init wdio .
```

```
Запустится WDIO CLI Wizard. Нажимаем:
```

```
On my local machine
mocha
No
Enter
Enter
n
spec
wait-for
chromedriver
Enter
Enter
```

```
В файле wdio.conf.js добавляем строки:
```

```
capabilities: [{

        maxInstances: 1,
        //
        browserName: 'chrome',
        
        'goog:chromeOptions': {
            args: ['--remote-debugging-port=9222'],
        },
```

```
Запускаем тесты
```

```
npx wdio run ./wdio.conf.js
```
