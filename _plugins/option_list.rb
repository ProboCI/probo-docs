module Jekyll
  module Tags
    class OptionList < Liquid::Block

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        content = converter.convert(super(context))
        "<ul class=\"option-list\">#{content}</ul>"
      end

    end
  end
end

Liquid::Template.register_tag('option_list', Jekyll::Tags::OptionList)
