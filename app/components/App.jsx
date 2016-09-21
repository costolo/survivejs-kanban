import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

export default class App extends React.Component {
	deleteNote(id, e) {
		e.stopPropagation();
		NoteActions.delete(id);
	}

	addNote() {
		NoteActions.create({
			task: 'no'
		});
	}

	editNote(id, task) {
		if (!task.trim()) {
			return;
		}
		NoteActions.update({
			id,
			task
		});
	}

	render() {
		return (
			<div className="container">
				<button className="addButton" onClick={this.addNote}>+</button>
				<AltContainer	
					stores={[NoteStore]}
					inject={{
						notes: () => NoteStore.getState().notes
					}}
				>
					<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		);
	}
}
