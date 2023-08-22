import { defineField, defineType } from "sanity";

export default defineType({
  name: "tent",
  title: "Tent",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title of tent-place",
      type: "string",
    }),
    // maybe should use geopoint
    defineField({
      name: "location",
      title: "Location of Tent",
      type: "geopoint",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description of tent-place",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity of Place",
      type: "number",
    }),
    defineField({
      name: "likes",
      title: "Number of likes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "rating",
      title: "Rating of tent-place",
      type: "number",
      options: {
        list: [
          { value: 1, title: "1" },
          { value: 2, title: "2" },
          { value: 3, title: "3" },
          { value: 4, title: "4" },
          { value: 5, title: "5" },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
