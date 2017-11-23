define(['ojs/ojcore', 'text!./view.html', './viewModel', 'text!./component.json', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('card-component', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }
);
