import React , {Component} from 'react';
import CheckboxTree from 'react-checkbox-tree';

const nodes = [
    {
        value: 'Ashadul',
        label: 'Ashadul',
        children: [
            { value: 'js', label: 'js' },
            { value: 'ex', label: 'ex' },
        ],
    },
    {
        value: 'Sani',
        label: 'Sani',
        children: [
            { value: 'laravel', label: 'laravel' },
            { value: 'vue', label: 'vue' },
        ],
    },
    {
        value: 'Mufid',
        label: 'Mufid',
    },
];

class AllCheckbox extends Component {
    state = {
        checked: [],
        expanded: [],
    };

    render() {
        return (
            <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                iconsClass="fa5"
            />
        );
    }
}

export default AllCheckbox;