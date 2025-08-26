import fetchNotes from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const NotesPage = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;
