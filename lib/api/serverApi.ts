import { cookies } from "next/headers";
import { axiosInstance } from "./api";
import { NoteId, type NotesHttpResponse, type fetchParams } from "./clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const fetchNotes = async (
  fetchParams: fetchParams
): Promise<NotesHttpResponse> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await axiosInstance.get<NotesHttpResponse>("/notes", {
    params: fetchParams,
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: NoteId): Promise<Note> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await axiosInstance.get<Note>(`/notes/${id}`, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await axiosInstance.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await axiosInstance.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
