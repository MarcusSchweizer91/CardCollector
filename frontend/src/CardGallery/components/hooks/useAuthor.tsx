import { useEffect, useState } from "react";
import  useUser  from "./useUser";

export default function useAuthor(author?: string) {
    const { userInfo } = useUser();
    const [canEdit, setCanEdit] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        if (userInfo && userInfo.username === author) {
            setCanEdit(true);
            setCanDelete(true);
        }
    }, [userInfo, author]);

    return { canEdit, canDelete };
}
