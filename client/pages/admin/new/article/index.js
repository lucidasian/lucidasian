import React, { Component } from 'react'
import Editor from 'draft-js-plugins-editor'
import { EditorState } from 'draft-js'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';


const inlineToolbarPlugin = createInlineToolbarPlugin()
const plugins = [inlineToolbarPlugin]

const { InlineToolbar } = inlineToolbarPlugin;

class ContentEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        if (process.browser)
            return (
                <div onClick={this.focus}zz>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <InlineToolbar />
                </div>
            )
        return (<div></div>)
    }
}

export default ContentEditor