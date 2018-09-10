module Jekyll
  module Tags
    class Option < Liquid::Block

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        content = converter.convert(super(context))
        "<li class=\"option-list__item\">#{content}</li>"
      end

    end
  end
end

Liquid::Template.register_tag('option', Jekyll::Tags::Option)
