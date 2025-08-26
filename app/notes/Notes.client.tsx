"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import fetchNotes from "@/lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

const NotesClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const openModal = () => {
    setmodalIsOpen(true);
  };
  const closeModal = () => {
    setmodalIsOpen(false);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox setQuery={updateSearchQuery} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            forcePage={currentPage}
            setCurrentPage={handlePageChange}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>

      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      {isSuccess && data.notes.length > 0 && (
        <NoteList notesData={data.notes} />
      )}
      {isSuccess && data.notes.length === 0 && (
        <p>nothing found on your request</p>
      )}
    </div>
  );
};

export default NotesClient;
