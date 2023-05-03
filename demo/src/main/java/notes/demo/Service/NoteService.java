package notes.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import notes.demo.Entity.Note;
import notes.demo.Repository.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Transactional
    public List<Note> getAll() {

        try {
            return noteRepository.findAll();
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }

    }

    @Transactional
    public Note getById(Long id) {
        try {
            Optional<Note> response = noteRepository.findById(id);
            if (response.isPresent()) {
                return response.get();
            } else {
                throw new Exception("Note not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public Note createNote(Note note) {

        try {
            return noteRepository.save(note);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }

    }

    @Transactional
    public Note editNote(Note note, Long id) {
        try {
            Optional<Note> response = noteRepository.findById(id);
            if (response.isPresent()) {
                note.setId(id);
                return noteRepository.save(note);
            } else {
                throw new Exception("Note not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public void deleteNote(Long id) {
        try {
            noteRepository.deleteById(id);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
