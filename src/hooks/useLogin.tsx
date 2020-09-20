import { useState } from "react";

const useLogin = () => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Response | null>(null);


    const run = (url: string, formData: FormData) => {
        setLoading(true);
        setTimeout(() => {
            fetch(url, {
                body: formData,
                cache: 'no-cache',
                method: 'POST',
            }).then(response => {
                if (response.ok) return response.json();
                setError(response);
            }).then(data => setData(data))
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setLoading(false)
                })
        }, 500)

    }

    return { run, data, loading, error }

}

export default useLogin;