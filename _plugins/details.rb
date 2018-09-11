# Source: https://gist.github.com/towbi/a67fda47e075d2b7fa4764bb42605063#file-details_tag-rb

module Jekyll
  module Tags
    class DetailsTag < Liquid::Block

      def initialize(tag_name, markup, tokens)
        super
        @caption = markup
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        caption = converter.convert(@caption).gsub(/<\/?p[^>]*>/, '').chomp
        body = converter.convert(super(context))
        "<details class=\"option-example\"><summary class=\"button button--inverse button-sm\">#{caption}<i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></summary>#{body}</details>"
      end

    end
  end
end

Liquid::Template.register_tag('details', Jekyll::Tags::DetailsTag)
 
