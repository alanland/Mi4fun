require ['app/greeter'], (model)->
    el = document.getElementById('content')
    greeter = new model.Greeter(el)
    greeter.start()
