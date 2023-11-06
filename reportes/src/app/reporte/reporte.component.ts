import { Component } from '@angular/core';
import * as pdfMake from  'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  logoDataUrl: string = '';
  
  createPDF(){

    const pdfDefininition: any = {
       content: [
          { text: 'Hola mundo', fontSize: 15 },

          { 
            text: [
              "Lorem Ipsum is simply dummy text of the printing and" + 
              "typesetting industry. Lorem Ipsum has been the industry's " +
              "standard dummy text ever since the 1500s, when an unknown " +
              "printer took a galley of type and scrambled it to make a type " + 
              "specimen book. It has survived not only five centuries, but also " +
              "the leap into electronic typesetting, remaining essentially unchanged. " + 
              "It was popularised in the 1960s with the release of Letraset sheets containing " +
              "Lorem Ipsum passages, and more recently with desktop publishing software " +
              "like Aldus PageMaker including versions of Lorem Ipsum."
            ]
          }
        ]
    };
    const pdf = pdfMake.createPdf(pdfDefininition).open();
  }

  openFreeStyle(){
    const documentDefinition: any = {
      content:[
        'Texto libre',

        {text:'Texto personalizado', fontSize:30, alignment: 'right', bold:true}
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfStyle() {
    const documentDefinition: any = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        {
          text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 40 },
            'than the rest.'
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfStyleDict() {
    const documentDefinition: any = {
      content: [
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },
        { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] }
      ],

      styles: {
        header: {
          fontSize: 10,
          bold: true
        },
        anotherStyle: {
          fontSize: 100,
          italic: true,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfColumns() {
    const documentDefinition: any = {
      content: [
        'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'First column'
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Second column'
            },
            {
              // fixed width
              width: 100,
              text: 'Third column'
            },
            {
              // percentage width
              width: '10%',
              text: 'Last column'
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        'This paragraph goes below all columns and has full width'
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfTables() {
    const documentDefinition: any = {
      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfLists() {
    const documentDefinition: any = {
      content: [
        'Bulleted list example:',
        {
          // to treat a paragraph as a bulleted list, set an array of items under the ul key
          ul: [
            'Item 1',
            'Item 2',
            'Item 3',
            { text: 'Item 4', bold: true },
          ]
        },

        'Numbered list example:',
        {
          // for numbered lists set the ol key
          ol: [
            'Item 1',
            'Item 2',
            'Item 3'
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfHeadersAndFootersStatic() {
    const documentDefinition: any = {
      header: 'simple text',

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },
      content: 'This is an sample PDF printed with pdfMake'
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  openPdfMargins() {
    const documentDefinition: any = {
      content: [
        'This is a standard paragraph, using default style',

        // margin: [left, top, right, bottom]
        { text: 'sample', margin: [5, 2, 10, 20] },

        // margin: [horizontal, vertical]
        { text: 'another text', margin: [5, 2] },

        // margin: equalLeftTopRightBottom
        { text: 'last one', margin: 5 }

      ]
    };
    pdfMake.createPdf(documentDefinition).open();

  }

  openPdfStackOfParagrahps() {
    const documentDefinition: any = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
          columns: [
            'first column is a simple text',
            {
              stack: [
                // second column consists of paragraphs
                'paragraph A',
                'paragraph B',
                'these paragraphs will be rendered one below another inside the column'
              ],
              fontSize: 15
            }
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

}
