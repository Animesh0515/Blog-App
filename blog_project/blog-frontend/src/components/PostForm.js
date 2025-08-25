import { useState } from "react";

export default function PostForm({ initialValues, onSubmit, buttonLabel }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [content, setContent] = useState(initialValues?.content || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-primary">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="label-primary">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field"
          rows="5"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <button
        type="submit"
        className="button-primary"
      >
        {buttonLabel}
      </button>
    </form>
  );
}


// import { useState } from "react";

// export default function PostForm({ initialValues, onSubmit, buttonLabel }) {
//   const [title, setTitle] = useState(initialValues?.title || "");
//   const [content, setContent] = useState(initialValues?.content || "");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!content.trim()) newErrors.content = "Content is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     onSubmit({ title, content });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-white mb-2">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 rounded border focus:outline-none focus:ring"
//         />
//         {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
//       </div>

//       <div>
//         <label className="block text-white mb-2">Content</label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 rounded border focus:outline-none focus:ring"
//           rows="5"
//         />
//         {errors.content && <p className="text-red-400 text-sm">{errors.content}</p>}
//       </div>

//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
//       >
//         {buttonLabel}
//       </button>
//     </form>
//   );
// }
