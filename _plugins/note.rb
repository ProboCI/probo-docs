module Jekyll
  module Tags
    class Note < Liquid::Block

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        content = converter.convert(super(context))
        "<div class=\"note\">#{content}</div>"
      end

    end
  end
end

Liquid::Template.register_tag('note', Jekyll::Tags::Note)
