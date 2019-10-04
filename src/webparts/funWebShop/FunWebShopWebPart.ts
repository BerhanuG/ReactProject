import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import * as strings from 'FunWebShopWebPartStrings';
import FunWebShop from './components/FunWebShop';
import { IFunWebShopProps } from './components/IFunWebShopProps';
import { IDataService, MockDataService } from '../../services/DataService';
import { PnPDataService } from '../../services/pnpDataService';
//import { sp } from 'sp-pnp-js';
import { sp } from '@pnp/sp';



export interface IFunWebShopWebPartProps {
  description: string;
  produkteravailable: boolean;
  produkterTitle: string;
  showNumberOfProdukter: number;

  usePnp: boolean;
}

export default class FunWebShopWebPart extends BaseClientSideWebPart<IFunWebShopWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  
  
  
  
  public render(): void {
  let service: IDataService;

  if (Environment.type === EnvironmentType.Local) {
    service = new MockDataService();
  } else {
    service = new PnPDataService();
  }

  service.getData().then((result) => {
    sp.web.currentUser.get().then((res) => {
      const element: React.ReactElement<IFunWebShopProps> = React.createElement(
        FunWebShop,
        {
          description: this.properties.description,
          showNumberOfProdukter: this.properties.showNumberOfProdukter,
          produkterList: result,          
          SPDataUpdate: service.OrdrarList,
          userId: res.Id,
          ordrarAndProdukterUpdate: service.myOrdrarAndProdukter,
         
          // Använd resultatet från anropet till att ge spLists
          // det värde som kom från SharePoint
          //produkterList: todos,

          //changeComplete: service.changeComplete


        }
      );
      ReactDom.render(element, this.domElement);
    });
  });
}


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneCheckbox('produkteravailable', {
                  text: 'Produkter Available'
                }),
                PropertyPaneSlider('showNumberOfProdukter', {
                  label: 'Välj antal',
                  min: 1,
                  max: 35,
                  step: 1
                }),
                PropertyPaneTextField('produkterTitle', {
                  label: 'Produkter Title'
                }),
                PropertyPaneCheckbox('usePnp', {
                  text: 'Använd PNP'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
