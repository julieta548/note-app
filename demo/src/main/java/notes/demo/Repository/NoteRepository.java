package notes.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import notes.demo.Entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

}