import { check, request } from 'react-native-permissions';
import type { Permission, PermissionStatus } from 'react-native-permissions';
import React from 'react';
import { Service } from 'react3l-common';

function usePermission(this: AbstractPermissionService) {
  React.useEffect(() => {
    this.checkPermission().catch((error) => {
      if (__DEV__) {
        console.error(error);
      }
    });
  }, []);
}

export abstract class AbstractPermissionService extends Service {
  public readonly usePermission = usePermission;

  abstract get permission(): Permission;

  abstract handlePermissionUnavailable(): void | Promise<void>;

  abstract handlePermissionBlocked(): void | Promise<void>;

  abstract handlePermissionDenied(): void | Promise<void>;

  abstract handlePermissionLimited(): void | Promise<void>;

  abstract handlePermissionGranted(): void | Promise<void>;

  async requestPermission(): Promise<PermissionStatus> {
    const status = await request(this.permission);
    return this.handlePermissionStatus(status);
  }

  async checkPermission(): Promise<PermissionStatus> {
    const status = await check(this.permission);
    await this.handlePermissionStatus(status);
    return status;
  }

  private async handlePermissionStatus(status: PermissionStatus) {
    switch (status) {
      case 'unavailable':
        await this.handlePermissionUnavailable();
        break;

      case 'blocked':
        await this.handlePermissionBlocked();
        break;

      case 'denied':
        await this.handlePermissionDenied();
        return this.requestPermission();

      case 'limited':
        await this.handlePermissionLimited();
        break;

      case 'granted':
      default:
        await this.handlePermissionGranted();
        break;
    }
    return status;
  }
}
